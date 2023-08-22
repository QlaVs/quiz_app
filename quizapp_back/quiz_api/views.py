from django.core.exceptions import ObjectDoesNotExist
from django.forms import model_to_dict
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from .serializers import RegisterSerializer, UserSerializer
from .models import *
from rest_framework import generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
        })


class Register(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# Class based view to Get User Details using Token Authentication
class QuizList(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)

        quizzes = Quiz.objects.all()

        from django.db.models import Count

        json_arr = []
        for quiz in quizzes:

            try:
                result = Results.objects.get(user=user, quiz=quiz).score
            except ObjectDoesNotExist:
                result = None

            json_arr.append({
                'id': quiz.id,
                'name': quiz.name,
                'description': quiz.description,
                'q_num': quiz.question_set.count(),
                'user_score': result
            })

        return JsonResponse(json_arr, safe=False)


class GetQuiz(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        quiz = Quiz.objects.get(id=request.GET['id'])

        questions = quiz.question_set.all()
        quiz = [model_to_dict(quiz)]

        questions_json = []
        for question in questions:
            answers_json = []
            for answer in question.get_answers():
                answers_json.append({
                    'id': answer.id,
                    'text': answer.text,
                })

            questions_json.append({
                'id': question.id,
                'text': question.text,
                'answers': answers_json,
            })

        json_obj = {"quiz": quiz, "questions": questions_json}

        return JsonResponse(json_obj, safe=False)


class CheckResults(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        quiz = Quiz.objects.get(id=request.data['quizId'])

        correct_answers = 0
        incorrect_answers = 0

        for question in request.data['answersData']:
            if quiz.question_set.get(id=question['questionId']).get_answers().get(id=question['answerId']).is_correct:
                correct_answers += 1
            else:
                incorrect_answers += 1

        percent = round(correct_answers / quiz.question_set.count() * 100, 2)

        Results.objects.update_or_create(
            user=User.objects.get(id=request.user.id),
            quiz=quiz,
            defaults={"score": percent}
        )

        context = {
            'correct': correct_answers,
            'incorrect': incorrect_answers,
            'score': percent
        }

        return JsonResponse(context, safe=False)
