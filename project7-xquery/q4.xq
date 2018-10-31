for $y in doc("auction.xml")/site/categories/category
return {
<category-type>
{$y/@id}
{
for $x in doc("auction.xml")/site/people/person
return
{
if($x/profile//interest/@category = $y/@id) then (
<person>{$x/@id}{data($x/name)}</person>
)
else()
}
}
</category-type>
}
