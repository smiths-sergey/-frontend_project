create table
    users (
        id serial UNIQUE,
        login varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        psw_salt varchar(255) NOT NULL,
        psw_hash varchar(255) NOT NULL,
        CONSTRAINT users_pk PRIMARY KEY (id),
        CONSTRAINT login_unique_pk UNIQUE (login)
    );

create table
    todos (
        id serial UNIQUE,
        user_id serial NOT NULL,
        date date NOT NULL,
        description text NOT NULL,
        is_completed BOOLEAN NOT NULL DEFAULT false,
        CONSTRAINT todos_pk PRIMARY KEY (id),
        CONSTRAINT todos_users_fk foreign key (user_id) references users (id)
    );