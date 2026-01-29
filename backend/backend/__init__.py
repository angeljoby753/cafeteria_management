import pymysql
import sys
pymysql.version_info =(2,2,1,"final",0 )
pymysql.install_as_MySQLdb()
sys.modules["MySQLdb"]=pymysql