from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Loan
from .serializers import LoanSerializer

# Create your views here.
class UserLoansView(APIView):
    def get(self, request, user_id, format=None):
        loans = Loan.objects.filter(user_id=user_id)
        serializer = LoanSerializer(loans, many=True)
        return Response(serializer.data)