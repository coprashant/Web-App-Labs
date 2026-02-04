from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from .models import Task 

def login_page(request):
    if request.user.is_authenticated:
        return redirect('todo_list')
    
    if request.method == 'POST':
        username_input = request.POST.get('username')
        password_input = request.POST.get('password')

        user = authenticate(request, username=username_input, password=password_input)
        
        if user is not None:
            login(request, user)
            return redirect('todo_list')
        else:
            messages.error(request, 'Username or Password is not correct')

    return render(request, 'login.html') 

def register_page(request):
    if request.user.is_authenticated:
        return redirect('todo_list')

    if request.method == 'POST':
        full_name = request.POST.get('full_name')
        email = request.POST.get('email')
        username = request.POST.get('username')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            messages.error(request, 'Passwords do not match')
            return redirect('register')
        
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username is already taken')
            return redirect('register')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email is already registered')
            return redirect('register')

        name_parts = full_name.split(' ', 1)
        f_name = name_parts[0]
        l_name = name_parts[1] if len(name_parts) > 1 else ""

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=f_name,  
            last_name=l_name    
        )
        user.save()

        login(request, user)
        return redirect('todo_list')

    return render(request, 'register.html')

def logout_user(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')
def todo_list(request):
    tasks = Task.objects.filter(user=request.user)
    
    search_input = request.GET.get('search-area')
    if search_input:
        tasks = tasks.filter(title__icontains=search_input)
    else:
        search_input = ''

    count = tasks.filter(complete=False).count()

    return render(request, 'list.html', {
        'tasks': tasks, 
        'count': count, 
        'search_input': search_input
    })

@login_required(login_url='login')
def todo_create(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description')
        complete = request.POST.get('complete')

        Task.objects.create(
            user=request.user,
            title=title,
            description=description,
            complete=True if complete == 'on' else False
        )
        return redirect('todo_list')
        
    return render(request, 'form.html')

@login_required(login_url='login')
def todo_update(request, pk):
    task = get_object_or_404(Task, id=pk)
    
    if request.method == 'POST':
        task.title = request.POST.get('title')
        task.description = request.POST.get('description')
        
        complete = request.POST.get('complete')
        task.complete = True if complete == 'on' else False
        
        task.save()
        return redirect('todo_list')

    return render(request, 'form.html', {'todo': task})

@login_required(login_url='login')
def todo_delete(request, pk):
    task = get_object_or_404(Task, id=pk)
    task.delete()
    return redirect('todo_list')