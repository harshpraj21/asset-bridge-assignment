from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('books', views.BookViewSet)
router.register('reviews', views.ReviewViewSet)

app_name = 'bookstore'

urlpatterns = [
    path('', include(router.urls))
]
