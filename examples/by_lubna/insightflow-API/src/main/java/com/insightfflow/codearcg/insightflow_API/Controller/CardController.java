package com.insightfflow.codearcg.insightflow_API.Controller;


import com.insightfflow.codearcg.insightflow_API.Model.Card;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/card")


public class CardController {
    private ArrayList<Card> cardStore = new ArrayList<>();

    @GetMapping
    public ArrayList<Card> getAllCards() {
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


