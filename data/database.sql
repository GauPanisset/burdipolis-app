CREATE TABLE PRODUCTS(
    ID INTEGER PRIMARY KEY   AUTOINCREMENT,
    TITLE            TEXT    NOT NULL,
    IMAGE            TEXT,
    CATEGORY         INTEGER,
    UP               INTEGER,
    DESCR1           TEXT,
    DESCR2           TEXT,
    DESCR3           TEXT,
    DESCR4           TEXT,
    DESCR5           TEXT
);

INSERT INTO PRODUCTS (TITLE, IMAGE, CATEGORY, DESCR1, UP)
VALUES ('TestProduct', 'https://medias.lequipe.fr/img-photo-jpg/-/1500000000826074/0-624-416-75/1acf4.jpg', 1, 'Test utilisation', 0);

INSERT INTO PRODUCTS (TITLE, IMAGE, CATEGORY, DESCR1, DESCR2)
VALUES ('Chaussure', 'https://www.bexley.fr/Bexley/CMS/Images/Produits/bellagio/hdbellagio_noir.jpg', 1, 'Balabak ezaeaze sqdsdqskd', 'qdqdqd');


CREATE TABLE CATEGORY(
    ID INTEGER  PRIMARY KEY   AUTOINCREMENT,
    COMPA           TEXT,
    ARG1            TEXT,
    ARG2            TEXT,
    ARG3            TEXT,
    ARG4            TEXT,
    ARG5            TEXT
);

INSERT INTO CATEGORY (ARG1, ARG2, ARG3, ARG4, ARG5)
VALUES ('Use', 'Test', 'Test2', 'Test3', 'Test4');

INSERT INTO CATEGORY (ARG1, ARG2, ARG3, ARG4)
VALUES ('Use', 'Cat', 'cat2', 'cat3');

INSERT INTO CATEGORY (COMPA, ARG1)
VALUES ('', 'Cat');

INSERT INTO CATEGORY (COMPA, ARG1)
VALUES ('', 'Cat4');

INSERT INTO CATEGORY (COMPA, ARG1)
VALUES ('', 'Cat5');

INSERT INTO CATEGORY (COMPA, ARG1)
VALUES ('', 'Cat6');

INSERT INTO CATEGORY (COMPA, ARG1)
VALUES ('', 'Cat7');

INSERT INTO CATEGORY (COMPA, ARG1)
VALUES ('', 'Cat8');

CREATE TABLE USERS(
    ID INTEGER PRIMARY KEY   AUTOINCREMENT,
    USERNAME        TEXT    NOT NULL,
    PASSWORD        TEXT    NOT NULL
);

INSERT INTO USERS (USERNAME, PASSWORD)
VALUES ('admin', '$2a$08$rLzvtxwZgPevf8zRVjb2PuCvFFW7SraHjrMekOmYs2luOJlRpfXRG');

