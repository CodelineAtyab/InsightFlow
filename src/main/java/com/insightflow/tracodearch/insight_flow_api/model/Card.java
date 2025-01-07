package com.insightflow.tracodearch.insight_flow_api.model;

public class Card {
    public String id;
    public String content;
    public String cardCategory;

    public Card(String id, String content, String cardCategory) {
        this.id = id;
        this.content = content;
        this.cardCategory = cardCategory;
    }
}

