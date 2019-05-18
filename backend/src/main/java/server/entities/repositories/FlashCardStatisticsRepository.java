package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.FlashCardStatistics.FlashCardStatisticsPK;
import server.entities.FlashCardStatistics;

import java.util.List;

public interface FlashCardStatisticsRepository extends CrudRepository<FlashCardStatistics, Long> {
    FlashCardStatistics findByFlashCardUser(FlashCardStatisticsPK flashCardUser);
}