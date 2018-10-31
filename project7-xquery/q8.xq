for $x in doc("auction.xml")/site/open_auctions/open_auction
where $x/bidder/personref/@person = "person3" and $x/bidder/following-sibling::*[personref/@person = "person6"]
return
<person>
{

{$x/@id},
{$x/reserve}

}
</person>