from django.urls import path, include, re_path
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token
from jobs import views
from django.conf.urls import url
from rest_framework import routers
from jobs import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token-auth/', obtain_jwt_token),
    path('core/', include('core.urls')),
]


router = routers.DefaultRouter()
router.register(r'jobs', views.JobView, 'job')
router.register(r'jobseekers', views.JobSeekerView, 'jobseeker')

urlpatterns += [
    path('api/', include(router.urls)),
]