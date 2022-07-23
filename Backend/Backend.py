import ssl
import smtplib
import sqlite3
from datetime import datetime


# Create Cursor and Table
conn = sqlite3.connect('d_contact_requests.db')
c = conn.cursor()

# Create Table t_contact_requests
c.execute("""
            CREATE TABLE IF NOT EXISTS t_contact_requests
            (member_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            firstname text NOT NULL,
            lastname text not null,
            mail text not null,
            tel text not null,
            b_date date not null,
            message text not null,
            confirmation bool not null,
            changelog date not null)
""")

i_firstname = 'Max'
i_lastname = 'Mustermann'
i_mail = 'MaxMustermann@web.de'
i_tel = '012548 159898'
i_b_date = '01.02.2022'
i_message = 'Hello World!'
i_confirmation = True
i_changelog = datetime.now()


row_contact_requests = ("""i_firstname,
                        i_lastname,
                        i_mail,
                        i_tel,
                        i_b_date,
                        i_message,
                        i_confirmation
                        i_changelog""")

c.execute(
    """Insert INTO t_contact_requests (firstname,
                                       lastname,
                                       mail,
                                       tel,
                                       b_date,
                                       message,
                                       confirmation,
                                       changelog)
                                       
                                       VALUES(  'Max',
                                                'Mustermann',
                                                'Max.Mustermann',
                                                '05954 1708',
                                                '20221203',
                                                'Hello World!',
                                                True,
                                                '20220316'
                                                )""")


# Auswahl von allen
c.execute("SELECT DISTINCT * FROM t_contact_requests")
# print(c.fetchall())


items = c.fetchall()

print(items)
