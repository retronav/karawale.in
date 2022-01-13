---
categories:
  - programming
cover: ''
date: 2021-06-04T06:30:00.000+00:00
summary:
  This post explains bit flags / binary flags, and also implements an "flag
  manager" in JavaScript.
tags:
  - javascript
  - binary
  - webdev
title: Bit fields for web developers
draft: true
layout: ../../layouts/PostLayout.astro
---

Bit fields, or binary fields, or binary bit fields, or binary flags as people call them, are really just bit positions in a number which make sense when we give the number some context. Now I know that sounds nonsense, but after you finish reading this post, you'll be familiar with bit fields and will hopefully start using them in your dream projects. As a bit of bonus, I will also write some code which can abstract this whole process.

# What are bit fields?

Quoting Wikipedia for a somewhat reasonable definition:

> A **bit field** is a [data structure](https://en.wikipedia.org/wiki/Data_structure 'Computer programming') used in [computer programming](https://en.wikipedia.org/wiki/Computer_programming). It consists of a number of adjacent [computer memory](https://en.wikipedia.org/wiki/Computer_memory 'Computer memory') locations which have been allocated to hold a sequence of [bits](https://en.wikipedia.org/wiki/Bit 'Bit'), stored so that any single bit or group of bits within the set can be addressed.

Which just means that each bit position of a number corresponds to a characteristic (or, a toggle setting), which can be turned on and off by toggling the corresponding bit.

## A somewhat real example

### Context

To show a real example of bit fields, let us start with a "imaginary" app that you were making. It is a simple drawing app which lets your users to draw on a canvas. Lets say that you allow three types of strokes : solid stroke, dashed stroke, and a dotted stroke, and four colors : red, green, blue, yellow. So to represent data in an object, you will definitely come up with something like this:

```javascript
{
	type: "solid",
	color : "red"
}
```

This does the job, but it is not very efficient. Say if this is an real-time multi-user app and you need to synchronize the drawings, you will marshal this object to JSON and send it. Which will take [30 bytes of space](https://www.geeksforgeeks.org/how-to-get-the-length-of-a-string-in-bytes-in-javascript/). Now realistically, that's not much huge, but if your app scales up and you add a plethora of features in the drawing aspect, you can imagine where is this going. Kilobytes of JSON going back and forth, probably wasting users' valuable data plan. What if I say, we can represent that object as `1000001`? Would you believe? You have to. Does this make sense? NO! What I showed just now is an example of bit field. It is an "bit array", in which each position corresponds to a setting, or flag. So if we specify positions for flags, this will make sense.

### Specifying the positions

We have two different fields in our data. One is the line type, and another is the line color. So, we have three line types, and four line colors, so we will have 7 bits in our bit array to represent all possible settings. We can divide the bit array : keep the right most 3 bits for line type and the rest of 4 for the colors. Which, visually will look like:

    0 0 0 0 0 0 0
    ┕--|-┙┕---|--┙
    Type	Color

We'll call the two as 'sections'. Then, in each section, we will further specify which bit is for which setting:

    0 0 0 0 0 0 0
    | | | | | | ┕----- Solid stroke   ┐
    | | | | | ┕------- Dashed stroke  ┣ Line types
    | | | | ┕--------- Dotted stroke  ┙
    | | | |
    | | | ┕----------- Yellow  ┐
    | | ┕------------- Green   |
    | ┕--------------- Blue    ┣ Colors
    ┕----------------- Red     ┙

### Summing it up

This way, we have given the bit array some "context". Now if we put the number I said earlier, `1000001` in this, it will immediately make sense:

    1 0 0 0 0 0 1
    | | | | | | ┕----- Solid stroke   ┐
    | | | | | ┕------- Dashed stroke  ┣ Line types
    | | | | ┕--------- Dotted stroke  ┙
    | | | |
    | | | ┕----------- Yellow  ┐
    | | ┕------------- Green   |
    | ┕--------------- Blue    ┣ Colors
    ┕----------------- Red     ┙

See the magic? This small, 7-bit number can specify a line's type and color in our drawing app. This data structure is extremely efficient, meaning that if you add 64 types of settings, it will take only 64 bits to store this data. Pretty nice, huh?

# Real examples

So probably you are still not convinced to use bit fields in real life. So here are some real life examples:

1. [Discord OAuth for bots](https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes)
2. [Game controllers](https://en.wikipedia.org/wiki/Bit_field#:~:text=/*%20Each%20of%20these,return%20gameControllerStatus%20%26%20key%3B%20%7D)
