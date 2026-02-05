from django.urls import path
from .views import student_list

urlpatterns = [
    path('api/students/', student_list),
]