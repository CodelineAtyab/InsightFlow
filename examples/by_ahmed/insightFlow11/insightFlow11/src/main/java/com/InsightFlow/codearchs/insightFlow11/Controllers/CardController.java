package com.InsightFlow.codearchs.insightFlow11.Controllers;

import com.InsightFlow.codearchs.insightFlow11.Models.Card;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/v1/card")
public class CardController {
    private ArrayList<Card> cardStore = new ArrayList<>();

    @GetMapping
    public ArrayList<Card> getAllCards() {
        return cardStore;
    }

    @GetMapping(path = "/{id}")
    public Card getSpecificCard(@PathVariable String id) {
        for (Card currCard : cardStore) {
            if (currCard.id.equals(id)) {
                return currCard;
            }
        }
        return null;
    }

    @PostMapping
    public Card addCard(@RequestBody Card incomingCard) {
        cardStore.add(incomingCard);
        return incomingCard;
    }


    @DeleteMapping(path = "/{id}")
    public String deleteSpecificCard(@PathVariable String id) {
        Card cardToRemove = null;
        for (Card currCard : cardStore) {
            if (currCard.id.equals(id)) {
                cardToRemove = currCard;
                break;
            }
        }
        if (cardToRemove != null) {
            cardStore.remove(cardToRemove);
            return "Card with id: " + id + " has been deleted!";
        } else {
            return "Card with id: " + id + " not found.";
        }
    }

    @PutMapping(path = "/{id}")
    public String updateCard(@PathVariable String id, @RequestBody Card updatedCard) {
        for (Card currCard : cardStore) {
            if (currCard.id.equals(id)) {
                currCard.content = updatedCard.content;
                return "Card with id: " + id + " has been updated!";
            }
        }
        return "Card with id: " + id + " not found.";
    }

}
