from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from . import views

urlpatterns = [
    path('register', views.Register.as_view()),
    path('login', views.Login.as_view()),
    path('getQuizList', views.QuizList.as_view()),
    path('getQuiz', views.GetQuiz.as_view()),
    path('checkResults', views.CheckResults.as_view()),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
