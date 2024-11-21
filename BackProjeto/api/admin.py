from django.contrib import admin
from .models import Book, Loan, Author, Comment

admin.site.register(Book)
admin.site.register(Loan)
admin.site.register(Author)
admin.site.register(Comment)
