package com.example.server.repository.custom.impl;

import com.example.server.constants.SystemConstant;
import com.example.server.entity.CustomerEntity;
import com.example.server.enums.SpecialSearchParamsEnum;
import com.example.server.repository.custom.CustomerRepositoryCustom;
import com.example.server.utils.MapUtils;
import com.example.server.utils.QueryBuilderUtils;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class CustomerRepositoryImpl implements CustomerRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<CustomerEntity> findCustomers(Map<String, Object> params) {
        StringBuilder finalQuery = new StringBuilder();
        StringBuilder joinQuery = new StringBuilder();
        StringBuilder whereQuery = new StringBuilder();

        finalQuery.append("SELECT customer.id, customer.fullname, customer.phone, customer.email,\n"
                            + "customer.demand, customer.note,\n"
                            + "customer.createddate, customer.modifieddate,customer.createdby,customer.modifiedby\n"
                            + "FROM customer\n");
        buildNormalQuery(params, whereQuery);
        buildSpecialQuery(params, whereQuery, joinQuery);
        finalQuery
                .append(joinQuery)
                .append(SystemConstant.ONE_EQUAL_ONE)
                .append(whereQuery)
                .append("\nGROUP BY customer.id");

        System.out.println("sql: " + finalQuery);
        Query query = entityManager.createNativeQuery(finalQuery.toString(), CustomerEntity.class);
        return query.getResultList();
    }

    // BUILD NORMAL QUERY
    private void buildNormalQuery(Map<String, Object> params, StringBuilder whereQuery) {
        for (Map.Entry<String, Object> item : params.entrySet()) {
            String key = item.getKey();
            if (!getSpecialSearchParams().contains(key.toLowerCase())) {
                String column = SystemConstant.CUSTOMER_ALIAS + key;
                Object value = item.getValue();

                if (item.getValue() instanceof String) {
                    whereQuery.append(QueryBuilderUtils.buildQueryWithLike(column, value.toString()));
                } else if (item.getValue() instanceof Integer) {
                    whereQuery.append(
                            QueryBuilderUtils.buildQueryWithOperator(column, value, SystemConstant.EQUAL_OPERATOR));
                }
            }
        }
    }

    // GET SPECIAL SERACH PARAMS
    private List<String> getSpecialSearchParams() {
        List<String> params = new ArrayList<>();

        for (SpecialSearchParamsEnum item : SpecialSearchParamsEnum.values()) {
            params.add(item.getValue().toLowerCase());
        }
        //System.out.println("SpecialSearchParamsEnum: " + params);
        return params;
    }

    // BUILD SPECIAL QUERY
    private void buildSpecialQuery(Map<String, Object> params, StringBuilder whereQuery,
                                   StringBuilder joinQuery) {
        Long staffId = MapUtils.getObject(params, SystemConstant.STAFF_ID, Long.class);;
        // STAFF ID
        if (staffId != null) {
            joinQuery.append(QueryBuilderUtils.buildingSqlWithJoin("assignmentcustomer", "customerid", "customer", "id"));
            whereQuery.append(QueryBuilderUtils.buildQueryWithOperator("assignmentcustomer.staffid", staffId,
                    SystemConstant.EQUAL_OPERATOR));
        }

    }
}
