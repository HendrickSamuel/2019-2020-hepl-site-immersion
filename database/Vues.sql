CREATE OR REPLACE VIEW coursdisponibles
AS
    SELECT Intitule,Cours,Date,PlageHoraire,
           sum(PlacesDisponibles),sum(PlacesTotal),sum(Indus),sum(Reseau),sum(Gestion)
    FROM coursimmersion
    JOIN cours ON (coursimmersion.Cours = cours.ID)
    WHERE visible = '1'
    GROUP BY Cours,Date,PlageHoraire;