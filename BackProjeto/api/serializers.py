from rest_framework import serializers
from .models import Book, Author, Comment, Loan
from authentication.models import User

class BookNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id_book', 'book_name')

class LoanSerializer(serializers.ModelSerializer):
    book = serializers.CharField(write_only=True)
    book_detail = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Loan
        fields = ('id_loan', 'book', 'book_detail', 'user')

    def get_book_detail(self, obj):
        return BookNestedSerializer(obj.book).data

    def create(self, validated_data):
        book_id = validated_data.pop('book')
        book = Book.objects.get(id_book=book_id)
        loan = Loan.objects.create(book=book, **validated_data)
        return loan

    def update(self, instance, validated_data):
        book_id = validated_data.pop('book')
        book = Book.objects.get(id_book=book_id)
        instance.book = book
        instance.save()
        return instance

class CommentContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('content',)

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    comment_date = serializers.DateTimeField(format='%d/%m/%Y %H:%M:%S', read_only=True)

    class Meta:
        model = Comment
        fields = ('id_comment', 'content', 'comment_date', 'book', 'user', 'username')

class AuthorNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id_author', 'author_name')

class BookSerializer(serializers.ModelSerializer):
    authors = AuthorNestedSerializer(many=True)

    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ('id_book', 'book_name', 'book_genre', 'authors', 'available', 'num_pages', 'book_img', 'comments')
        
    def create(self, validated_data):
        authors_data = validated_data.pop('authors')
        book = Book.objects.create(**validated_data)

        for author_data in authors_data:
            author, created = Author.objects.get_or_create(**author_data)
            book.authors.add(author)

        return book
    
    def update(self, instance, validated_data):
        authors_data = validated_data.pop('authors')
        instance = super().update(instance, validated_data)

        instance.authors.clear()
        for author_data in authors_data:
            author, created = Author.objects.get_or_create(**author_data)
            instance.authors.add(author)
        
        return instance

class AuthorSerializer(serializers.ModelSerializer):
    books = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = ('id_author', 'author_name', 'books')
    
    def get_books(self, obj):
        return Book.objects.filter(authors=obj).values_list('book_name')