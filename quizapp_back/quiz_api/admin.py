from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline

from .models import Quiz, Question, Answer, QuizzesNQuestions, Results


class AnswerInline(admin.TabularInline):
    model = Answer


class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]


class QuestionInline(admin.TabularInline):
    model = Question.quiz.through


class QNQAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]


# Register your models here.
admin.site.register(Question, QuestionAdmin)
admin.site.register(Quiz, QNQAdmin)
admin.site.register(Results)
