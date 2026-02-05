from django.http import JsonResponse
from .models import Student

def student_list(request):
    student = Student(name="Harry", faculty="BCT")
    student.save()
    students = Student.objects.all()
    data = []
    for s in students:
        data.append({
            'id': s.id,
            'name': s.name,
            'faculty': s.faculty
        })
    return JsonResponse(data, safe=False)