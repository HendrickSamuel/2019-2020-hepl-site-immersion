DELIMITER //
CREATE OR REPLACE TRIGGER UpdateDisponibilites
    BEFORE INSERT ON inscritscours
    FOR EACH ROW
BEGIN
    DECLARE places TINYINT;
    DECLARE errno SMALLINT UNSIGNED DEFAULT 31001;

    SELECT PlacesDisponibles INTO places
    FROM coursimmersion WHERE ID = NEW.Horaire FOR UPDATE;

    IF(places < 1) THEN
        SIGNAL SQLSTATE '45000' SET
            MYSQL_ERRNO = errno,
            MESSAGE_TEXT = _utf8'';
    ELSE
        UPDATE coursimmersion SET PlacesDisponibles = places-1 WHERE ID = NEW.Horaire;
    END IF;

END; //