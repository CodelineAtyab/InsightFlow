package com.InsightFlow.InsightFlow.Controllers;

import com.InsightFlow.InsightFlow.Entities.Card;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/card")
public class CardController {
    private ArrayList<Card> cardStore = new ArrayList<>();

    @GetMapping
    public ArrayList<Card> getAllCards() {
        return cardStore;
    }

    @GetMapping(path = "/{id}")
    public Card getSpecificCard(@PathVariable String id) {
        Card filteredCard = cardStore.stream().filter(
                (currCard) -> currCard.id.equals(id)
        ).findFirst().get();

        return filteredCard;
    }

    @PostMapping
    public Card addCard(@RequestBody Card incomingCard) {
        cardStore.add(incomingCard);
        return incomingCard;
    }

    @DeleteMapping(path = "/{id}")
    public String deleteCard(@PathVariable String id) {
        Boolean isThere = false;
        for (Card card : cardStore) {
            if (card.id.equals(id)) {
                isThere = true;
                cardStore.remove(card);
            }
        }
        if (isThere) {
            return "Card " + id + " deleted successfully";
        } else {
            return "card not found";
        }
    }

    @PutMapping(path = "/{id}")
    public Card updateCard(@PathVariable String id, @RequestBody Card incomingCard) {
        Card filteredCard = cardStore.stream().filter(
                (currCard) -> currCard.id.equals(id)
        ).findFirst().get();
        filteredCard.content = incomingCard.content;
        return filteredCard;
    }
}