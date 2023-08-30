import mysql.connector

#connection = mysql.connector.connect(host="localhost", user="root", password="", database="ecommerce")

def insert(cliente,rua,numero,bairro,cidade,estado,pais,cep):
    try:
        connection = mysql.connector.connect(host='localhost',
                                             database='ecommerce',
                                             user='root',
                                             password='')
        cursor = connection.cursor()
        mysql_insert_query = """INSERT INTO endereco_cliente (cli_codigo, enc_rua, enc_numero, enc_bairro, enc_cidade, enc_estado, enc_pais, enc_cep) 
                                VALUES (%s, %s, %s, %s, %s, %s, %s, %s) """


        record = (cliente, rua, numero, bairro, cidade, estado, pais, cep)
        cursor.execute(mysql_insert_query, record)
        connection.commit()
        print("Deu certo")


    except mysql.connector.Error as error:
        print("Nao deu {}".format(error))


    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


insert(4, 'Rua Teste 2', 200, 'Itaquera', cidade='são paulo', estado='são paulo', pais='brazil', cep='12343-965')