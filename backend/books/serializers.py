import django_filters
from rest_framework import serializers
from core.models import Book, Review
from user.serializers import UserPublicSerializer


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'book', 'user', 'rating', 'comment', 'timestamp']
        read_only_fields = ['id', 'timestamp', 'user']

class BookFilter(django_filters.FilterSet):
    genre = django_filters.CharFilter(lookup_expr='icontains')
    author = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Book
        fields = ['genre', 'author']

class BookSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)
    average_rating = serializers.SerializerMethodField()
    filterset_class = BookFilter

    class Meta:
        model = Book
        fields = ['id', 'user' , 'title', 'author', 'genre', 'published_year', 'average_rating']
        read_only_fields = ['id', 'user']

    def get_average_rating(self, obj) -> float:
        return round(obj.average_rating(), 1)


class BookDetailSerializer(BookSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta(BookSerializer.Meta):
        fields = BookSerializer.Meta.fields + ['reviews']
