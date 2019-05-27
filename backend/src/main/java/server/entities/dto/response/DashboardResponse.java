package server.entities.dto.response;

import lombok.Data;

import java.util.stream.IntStream;

@Data
public class DashboardResponse {
    private Long ownBoxes;
    private Long accesToForeignBoxes;

    private Long totalTrials;
    private Long successfulTrials;
    private Long failedTrials;

    private Long[] cardsInDecks;

    public DashboardResponse() {
        super();
    }

    public void setCardsInDecks(long[] cards) {
        cardsInDecks = new Long[cards.length];
        IntStream.range(0, cards.length).forEach(i -> cardsInDecks[i] = cards[i]);
    }
}
