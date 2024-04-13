create table
    localities (
        id serial UNIQUE,
        title varchar(255),
        lat varchar(255),
        lon varchar(255),
        CONSTRAINT localities_pk PRIMARY KEY (id),
        CONSTRAINT lat_lon_unique_pk UNIQUE (lat, lon)
    );

create table
    pollutions (
        id serial UNIQUE,
        locality_id serial NOT NULL,
        time TIMESTAMP NOT NULL,
        co numeric(7, 2),
        no numeric(7, 2),
        no2 numeric(7, 2),
        o3 numeric(7, 2),
        so2 numeric(7, 2),
        pm2_5 numeric(7, 2),
        pm10 numeric(7, 2),
        nh3 numeric(7, 2),
        CONSTRAINT pollutions_pk PRIMARY KEY (id),
        CONSTRAINT locality_time_unique_pk UNIQUE (locality_id, time),
        CONSTRAINT pollutions_localities_fk foreign key (locality_id) references localities (id)
    );

create table
    users (
        id serial UNIQUE,
        login serial NOT NULL,
        email serial NOT NULL,
        psw_salt serial NOT NULL,
        psw_hash serial NOT NULL,
        CONSTRAINT users_pk PRIMARY KEY (id),
        CONSTRAINT login_unique_pk UNIQUE (locality_id),
    );