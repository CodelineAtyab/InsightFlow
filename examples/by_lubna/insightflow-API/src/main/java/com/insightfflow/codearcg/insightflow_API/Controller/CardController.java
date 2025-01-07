package com.insightfflow.codearcg.insightflow_API.Controller;


import com.insightfflow.codearcg.insightflow_API.Model.Card;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/v1/card")


public class CardController {
    private CopyOnWriteArrayList<Card> cardStore = new CopyOnWriteArrayList<>();

    @GetMapping
    public List<Card> getAllCards() {
        return cardStore;
    }

    @GetMapping(path = "/{id}")
    public Card getSpecificCard(@PathVariable String id) {

        Card filteredCard = cardStore.stream().filter(
                (currCard) -> {
                    return currCard.id.equals(id);
                }
        ).findFirst().get();

        return filteredCard;
    }


    @DeleteMapping(path = "/{id}")
    public Card deleteSpecificCard(@PathVariable String id) {
        Card cardToDelete = this.getSpecificCard(id);
        cardStore.remove(cardToDelete);
        return cardToDelete;
    }

    @PostMapping
    public Card getAllTheCard(@RequestBody Card incomingCard) {
        cardStore.add(incomingCard);
        return incomingCard;
    }

    @PutMapping(path = "/{id}")
    public Card updateSpecificCard(@PathVariable String id, @RequestBody Card updatedCard) {
        for (int i = 0; i < cardStore.size(); i++) {
            if (cardStore.get(i).id.equals(id)) {

                cardStore.set(i, updatedCard);
                return updatedCard;
            }
        }
        throw new RuntimeException("Card with id " + id + "is not found.");
    }
}


