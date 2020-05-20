from django.test import TestCase
from django.contrib.auth.models import User
from posts.models import Post


class PostModelTest(TestCase):

    def test_create_post(self):
        user = User.objects.create(username='adrian1234', password='password123',
                                     email='example@example.com', first_name='John', last_name='Doe')
        post = Post.objects.create(
            user=user, caption='This is a caption', img_url="http://www.google.com")
        self.assertEquals(Post.objects.first().user, user)
        self.assertEquals(Post.objects.first().caption, 'This is a caption')
        self.assertEquals(Post.objects.first().img_url, 'http://www.google.com')
    

