--  find employees with salaries higher than the average salary
select *
from emp
where salary > (select AVG(salary) from emp)

-- find customers
select *
from orders
where total_price > (
    select o.customer_id 
    from orders o
    where total_price > 1000
);

-- top 10 custimers based on revenue
select customer_name,
       SUM(order_total) as total_revenue
from orders
group by
    customer_name
order by
    total_recenue