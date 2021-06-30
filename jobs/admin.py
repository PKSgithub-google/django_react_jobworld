from django.contrib import admin

from .models import JobSeeker, Company, Education, Skill, Job, JobApplicant


admin.site.register(Education)
admin.site.register(Skill)
admin.site.register(JobSeeker)
admin.site.register(Company)
admin.site.register(Job)
admin.site.register(JobApplicant)


