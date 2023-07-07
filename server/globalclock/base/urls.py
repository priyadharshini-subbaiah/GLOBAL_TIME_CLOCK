from django.urls import path
from . import views

urlpatterns = [
    path('api/store', views.save_custom_time),
]