from rest_framework import viewsets, status
from rest_framework.response import Response
from api import serializers, models
from .models import Book, Loan
from django.shortcuts import get_object_or_404

class AuthorViewset(viewsets.ModelViewSet):
    serializer_class = serializers.AuthorSerializer
    queryset = models.Author.objects.all()

class AuthorNestedViewset(viewsets.ModelViewSet):
    serializer_class = serializers.AuthorNestedSerializer
    queryset = models.Author.objects.all()

class BookViewset(viewsets.ModelViewSet):
    serializer_class = serializers.BookSerializer
    queryset = models.Book.objects.all()

class LoanViewset(viewsets.ModelViewSet):
    serializer_class = serializers.LoanSerializer
    queryset = models.Loan.objects.all()

    def create(self, request, *args, **kwargs):
        book = get_object_or_404(Book, pk=request.data['book'])
        if not book.available:
            return Response({'error': 'Book is not available'}, status=status.HTTP_400_BAD_REQUEST)
        
        response = super().create(request, *args, **kwargs)
        
        if response.status_code == status.HTTP_201_CREATED:
            book.available = False
            book.save()
        
        return response

    def destroy(self, request, *args, **kwargs):
        loan = self.get_object()
        loan.book.available = True
        loan.book.save()
        return super().destroy(request, *args, **kwargs)

class CommentViewset(viewsets.ModelViewSet):
    serializer_class = serializers.CommentSerializer
    queryset = models.Comment.objects.all()

class CommentContent(viewsets.ModelViewSet):
    serializer_class = serializers.CommentContentSerializer
    queryset = models.Comment.objects.all()



