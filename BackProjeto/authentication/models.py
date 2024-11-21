from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, Group, Permission
from uuid import uuid4


class CustomUserManager(BaseUserManager):
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('O e-mail do usuário é obrigatório.')

		if not password:
			raise ValueError('A senha do usuário é obrigatória.')

		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user

	def create_superuser(self, email, password=None):
		if not email:
			raise ValueError('A user email is needed.')

		if not password:
			raise ValueError('A user password is needed.')

		user = self.create_user(email, password)
		user.is_superuser = True
		user.is_staff = True
		user.save()
		return user


class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    email = models.EmailField(max_length=100, unique=True)
    username = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateField(auto_now_add=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['username']
    objects = CustomUserManager()

    groups = models.ManyToManyField(
        Group,
        verbose_name=('groups'),
        blank=True,
        help_text=(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name="custom_user_set",
        related_query_name="user",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=('user permissions'),
        blank=True,
        help_text=('Specific permissions for this user.'),
        related_name="custom_user_set",
        related_query_name="user",
    )

    def __str__(self):
        return self.email