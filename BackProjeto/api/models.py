from django.db import models
from django.contrib .auth import get_user_model
from uuid import uuid4

'''
class User(models.Model):
    id_user = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    username = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.Charfield(max_Length=30)
    password = models.CharField(max_length=30, min_length=8)
    cpf = models.IntegerField() #validaçao cpf
    phone_number = models.CharField() #verificar
    contact_picture = models.URLField(nulll=True)#verificar

    def create_user(self):
        return
    
    def delete_user(self):
        return
    
    def edit_user(self):
        return
'''

User = get_user_model()

class Author(models.Model):
    id_author = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    author_name = models.CharField(max_length=30)

    def __str__ (self):
        return self.author_name

    def import_book_name(self):
        return self.book.book_name
    
    '''def create_author(self):
        return
    
    def delete_author(self):
        return
    
    def edit_author(self):
        return'''

class Book(models.Model):
    id_book = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    book_name = models.CharField(max_length=30)
    book_genre = models.CharField(max_length=20)
    book_img = models.URLField(null=True)
    authors = models.ManyToManyField(Author) #importando author
    available = models.BooleanField(default=True)
    num_pages = models.IntegerField(max_length=4)

    def __str__ (self):
        return self.book_name
    
    def import_author_name(self):
        return self.author.author_name
    
    '''def create_book(self):
        return
    
    def delete_book(self):
        return
    
    def edit_book(self):
        return
    
    def change_availability(self):
        return'''

class Loan(models.Model):
    id_loan = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    book = models.ForeignKey(Book, on_delete=models.CASCADE) #importando book_name
    date_in = models.DateField#verificar Datefield
    user = models.ForeignKey(User, on_delete=models.CASCADE) #importando username

    def __str__ (self):
        return self.book.book_name
    
    def import_book_name(self):
        return self.book.book_name
    
    def import_username(self):
        return self.user.username
    
class Comment(models.Model):
    id_comment = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE) #importando username
    book = models.ForeignKey(Book, related_name="comments", on_delete=models.CASCADE) #importando book_name
    content = models.CharField(max_length=250) #verificar length
    comment_date = models.DateTimeField(auto_now_add=True, null=True)

    def __str__ (self):
        return self.content
    
    def import_username(self):
        return self.user.username
    
    def import_book_name(self):
        return self.book.book_name











