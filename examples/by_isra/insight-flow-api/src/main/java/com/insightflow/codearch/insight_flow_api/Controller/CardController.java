package com.insightflow.codearch.insight_flow_api.Controller;

import com.insightflow.codearch.insight_flow_api.Model.Card;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@RestController
@CrossOrigin (origins = "*")
@RequestMapping(path = "/card")
public class CardController {
    //define an array list that will store all the
    private ArrayList<Card> cardArrayList = new ArrayList<>();

    @GetMapping
    public ArrayList<Card> getAllCards(){
        return cardArrayList;
    }

    @GetMapping(path = "/{id}")
    public Card getCardByID(@PathVariable String id){
        return cardArrayList.stream()
                .filter(card -> card.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Card not found"));
    }

    @PostMapping
    public Card addCard(@RequestBody Card newCard){
        cardArrayList.add(newCard);
        return newCard;
    }

    @DeleteMapping(path = "/{id}")
    public void deleteCardByID(@PathVariable String id){
        cardArrayList.removeIf(currentCard -> currentCard.getId().equals(id));
    }

    @PutMapping(path = "/{id}")
    public Card updateCard(@PathVariable String id, @RequestBody Card updatedCard){
        for(int i=0; i< cardArrayList.size(); i++){
            Card currentCard = cardArrayList.get(i);
            if(currentCard.id.equals(id)){
                //replace card
                cardArrayList.set(i, updatedCard);
                return updatedCard;
            }
        }
        //in case card doesn't exist
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Card not found");
    }


}
