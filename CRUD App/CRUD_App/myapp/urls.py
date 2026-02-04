from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_page, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('register/', views.register_page, name='register'),

    path('', views.todo_list, name='todo_list'),
    path('todo-create/', views.todo_create, name='todo_create'),
    path('todo-update/<int:pk>/', views.todo_update, name='todo_update'),
    path('todo-delete/<int:pk>/', views.todo_delete, name='todo_delete'),
]
