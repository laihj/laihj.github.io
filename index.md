---
layout: page
title: build apps
tagline: []
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a>
        <p>update {{ post.title }}</p>
        <p>{{ post.content }}</p>
    </li>
  {% endfor %}
</ul>

