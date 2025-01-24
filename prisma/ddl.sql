create database gptgenius CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
create database prisma_shadow CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
 
 
create user `gptgenius`@`%` identified by '1111';  


grant all privileges on gptgenius.* to `gptgenius`@`%` ;
grant all privileges on prisma_shadow.* to `gptgenius`@`%` ;