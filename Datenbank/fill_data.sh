docker exec -it edb-apo_db_1 mysql -uedbapo -pedbapoadmin -e "use edb-apo-db; $(cat EDB-Apo_dbdec.sql)"
docker exec -it edb-apo_db_1 mysql -uedbapo -pedbapoadmin -e "use edb-apo-db; $(cat EDB-Apo_dbdata.sql)"

