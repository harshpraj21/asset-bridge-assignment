from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from books.serializers import BookSerializer, BookDetailSerializer, ReviewSerializer
from core.models import Book, Review
from core.permissions_utils import IsAuthorOrReadonly


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all().order_by('-updated_at')
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadonly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['genre', 'author']

    def get_serializer_class(self):
        if self.action == "retrieve":
            return BookDetailSerializer
        return self.serializer_class

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'], url_path='genres')
    def list_genres(self, request):
        genres = Book.objects.values_list('genre', flat=True).distinct().order_by('genre')
        return Response(genres)

    @action(detail=False, methods=['get'], url_path='authors')
    def list_authors(self, request):
        authors = Book.objects.values_list('author', flat=True).distinct().order_by('author')
        return Response(authors)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadonly]

    def get_queryset(self):
        queryset = Review.objects.all().order_by('-timestamp')
        book_id = self.request.query_params.get("book")
        if book_id:
            queryset = queryset.filter(book_id=book_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
