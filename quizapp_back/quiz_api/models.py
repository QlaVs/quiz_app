from django.db import models

from django.contrib.auth.models import User


# Create your models here.
class Quiz(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)

    def __str__(self):
        return f'{self.name}'


class Question(models.Model):
    quiz = models.ManyToManyField(Quiz, blank=True)
    text = models.CharField(max_length=1000, blank=False)

    def __str__(self):
        return f'{self.text}'

    def get_answers(self):
        return self.answers.all()


class QuizzesNQuestions(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.DO_NOTHING)
    questions = models.ForeignKey(Question, blank=True, on_delete=models.DO_NOTHING)


class Answer(models.Model):
    text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')

    def __str__(self):
        return f'q: {self.question.text} - a: {self.text}'


class Results(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.FloatField()
