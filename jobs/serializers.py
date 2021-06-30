from rest_framework import serializers
from .models import Job, JobSeeker

class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job 
        fields = ('id', 'designation', 'location', 'job_description', 'job_type', 'registrationDate','salary','is_published','country')

class JobSeekerSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobSeeker 
        fields = ('id','fname', 'mname', 'lname', 'gender', 'address','email','mobile','experience','date_registration','country')

