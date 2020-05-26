"""instagramclone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView, TokenRefreshView,)
from rest_framework_simplejwt.views import TokenRefreshView



from posts import views as post_views
from frontend import views as frontend_views
from users import views as user_views

router = routers.SimpleRouter()

router.register(r'api/posts', post_views.PostViewSet)

urlpatterns = router.urls
urlpatterns += [
    path('api/posts/latest', post_views.LatestPostList.as_view(), name="latest-posts"),
    path('api/register/', user_views.CreateUserView.as_view(), name="register-user"),
    path('api/token/', user_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    # path('', include('frontend.urls')),

    # Adding ability to access files from url
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Adding urls for frontend
urlpatterns += [
    re_path(r'^$', frontend_views.index),
    # match all other pages
    re_path(r'^(?:.*)/?$', frontend_views.index),
]
