from django.shortcuts import render
from django.db import IntegrityError
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from ecommerce.models import EcommerceUser

# Create your views here.

def existe_um_usuario_com_o_email(email):    
    try:
        resultado = EcommerceUser.objects.get(email=email)
        if resultado:
            return True
    except Exception:
        return False

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
                    
            data = JSONParser().parse(request) # data is a dictionary
            #obtendo os dados da requisição e armazenando em variáveis
            username = data['username']
            password = data['password']
            nome_e_sobrenome = data['nomeSobrenome']
            email = data['email']
            
            if existe_um_usuario_com_o_email(email):
                return JsonResponse({'error': 'email error'}, status=400)
            
            auth_user = User.objects.create_user(
            username=username,
            password=password)
            auth_user.save()
            
            token = Token.objects.create(user=auth_user)

            ecommerce_user = EcommerceUser(
                nome_e_sobrenome=nome_e_sobrenome,
                email=email,
                login_name=username,
                token=str(token),
                )
            ecommerce_user.save()
            
            return JsonResponse({'token':str(token)},status=201)
        except IntegrityError:
            return JsonResponse(
            {'error':'username error'},
            status=400)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user = authenticate(
        request,
        username=data['username'],
        password=data['password'])
    if user is None:
        return JsonResponse(
        {'error':'unable to login. check username and password'},
        status=400)
    else: # return user token
        try:
            token = Token.objects.get(user=user)
        except: # if token not in db, create a new one
            token = Token.objects.create(user=user)
        return JsonResponse({'token':str(token)}, status=201)