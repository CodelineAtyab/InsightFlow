package com.insightflow.codearch.insight_flow_api.Controller;

import com.insightflow.codearch.insight_flow_api.Model.Card;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.regex.Pattern;

@RestController
@CrossOrigin (origins = "*")
@RequestMapping(path = "/card")
public class CardController {
    //define an array list that will store all the
    private CopyOnWriteArrayList<Card> cardArrayList = new CopyOnWriteArrayList<>();

    @GetMapping
    public List<Card> getAllCards(){
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
        //validate the input
        //this is the only format allowed: wwc_num, aic_num, cfc_num
        String regex = "^(wwc|aic|cfc)_[0-9]+$";
        if (!Pattern.matches(regex, newCard.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid card ID format");
        }
        //if input is valid, then generate the card id randomly
        newCard.id = newCard.id.split("_")[0] + "_" + UUID.randomUUID().toString();
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
