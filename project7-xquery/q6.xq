<AuctionsinEurope>
{
        for $x in doc('auction.xml')/site/regions/europe/item
        return
                {
                        for $y in doc('auction.xml')/site/closed_auctions/closed_auction
                        where $y/itemref/@item = $x/@id
                        return
                                {
                                        for $z in doc('auction.xml')/site/people/person
                                        where $z/@id = $y/buyer/@person
                                        return

                                                        {$z/name},
                                                        <Itemname>{$x/name}</Itemname>

                                }
                }
}
</AuctionsinEurope>
