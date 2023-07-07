from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CustomTime

@api_view(['POST'])
def save_custom_time(request):

    try:
        data = request.data
        custom_time = CustomTime.objects.create(
            hours=data['hours'],
            minutes=data['minutes'],
            seconds=data['seconds'],
            am_pm=data['am_pm']
        )
        
    except Exception as e :

        print(e)
    return Response("Custom time saved successfully.")    

        
