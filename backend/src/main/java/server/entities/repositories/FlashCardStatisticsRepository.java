package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.FlashCardStatistics;
import server.entities.FlashCardStatistics.FlashCardStatisticsPK;

public interface FlashCardStatisticsRepository extends CrudRepository<FlashCardStatistics, Long> {
    FlashCardStatistics findByFlashCardUser(FlashCardStatisticsPK flashCardUser);
}