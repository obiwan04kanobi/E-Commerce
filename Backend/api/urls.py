from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.add_product, name='add_product'),
    path('place_order/', views.place_order, name='place_order'),
    path('register/', views.register_user, name='register_user'),
    path('csrf/', views.get_csrf_token, name='get_csrf_token'),
    path('order/<str:order_id>/', views.get_order, name='get_order'),  # Keep this for getting order
    path('order/update/<str:order_id>/', views.update_order, name='update_order'),  # Different URL for updating order
    path('user/add_order/<str:user_id>/', views.add_order_to_user, name='add_order_to_user'),
    path('product/update_stock/<str:product_id>/', views.update_stock, name='update_stock'),
    path('create_razorpay_order/', views.create_razorpay_order, name='create_razorpay_order'),
]
