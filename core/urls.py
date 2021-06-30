from django.urls import path
from .views import current_user, UserList

app_name = "core"

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]