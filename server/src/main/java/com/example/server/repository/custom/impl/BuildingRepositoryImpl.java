package com.example.server.repository.custom.impl;

import com.example.server.constants.SystemConstant;
import com.example.server.entity.BuildingEntity;
import com.example.server.enums.SpecialSearchParamsEnum;
import com.example.server.repository.custom.BuildingRepositoryCustom;
import com.example.server.utils.MapUtils;
import com.example.server.utils.QueryBuilderUtils;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class BuildingRepositoryImpl implements BuildingRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<BuildingEntity> findBuildings(Map<String, Object> params) {

        StringBuilder finalQuery = new StringBuilder();
        StringBuilder joinQuery = new StringBuilder();
        StringBuilder whereQuery = new StringBuilder();

        finalQuery.append("SELECT building.id, building.name, building.street, building.ward, building.districtid, "
                + "building.structure, building.numberofbasement, building.floorarea, building.direction,"
                + "building.level, building.rentprice, building.rentpricedescription,"
                + "building.servicefee, building.carfee, building.motorbikefee,building.overtimefee,"
                + "building.waterfee, building.electricityfee, building.deposit, building.payment,"
                + "building.renttime, building.decorationtime,building.brokeragefee, building.note, "
                + "building.linkofbuilding, building.map, building.image, "
                + "building.managername, building.managerphone, building.rentareadescription, "
                + "building.createddate, building.modifieddate,building.createdby,building.modifiedby "
                + " FROM building ");

        Object rentTypesObject = params.get(SystemConstant.RENTTYPE_S);
        List<String> buildingTypes = new ArrayList<>();
        if (rentTypesObject != null) {
            if (rentTypesObject instanceof String) {
                String rentTypesString = ((String) rentTypesObject).trim();
                String[] rentTypesArray = rentTypesString.isEmpty() ? new String[0] : rentTypesString.split(",");
                buildingTypes = Arrays.asList(rentTypesArray);
            } else if (rentTypesObject instanceof List) {
                // Directly cast if it's already a List
                buildingTypes = (List<String>) rentTypesObject;
            }
        }
        //System.out.println("Building Types: " + buildingTypes.size());


        buildSpecialQuery(params, buildingTypes, whereQuery, joinQuery);
        buildNormalQuery(params, whereQuery);
        finalQuery.append(joinQuery).append(SystemConstant.ONE_EQUAL_ONE).append(whereQuery)
                    .append("\nGROUP BY building.id");
            //System.out.println("sql: " + finalQuery);

        Query query = entityManager.createNativeQuery(finalQuery.toString(), BuildingEntity.class);

        return query.getResultList();
    }

    // BUILD NORMAL QUERY
    private void buildNormalQuery(Map<String, Object> params, StringBuilder whereQuery) {

        for (Map.Entry<String, Object> item : params.entrySet()) {
            String key = item.getKey();
            if (
                /*
                 * !item.getKey().equals("buildingtypes") &&
                 * !item.getKey().startsWith("arearent") && !item.getKey().equals("district") &&
                 * !item.getKey().equals("staffid") && !item.getKey().startsWith("costrent")
                 */
                    !getSpecialSearchParams().contains(key.toLowerCase())) {

                String column = SystemConstant.BUILDING_ALIAS + key;
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
    private void buildSpecialQuery(Map<String, Object> params, List<String> buildingTypes, StringBuilder whereQuery,
                                   StringBuilder joinQuery) {

        String districtCode = MapUtils.getObject(params, SystemConstant.DISTRICT_CODE, String.class);
        Long staffId = MapUtils.getObject(params, SystemConstant.STAFF_ID, Long.class);
        Integer areaRentFrom = MapUtils.getObject(params, SystemConstant.RENT_AREA_FROM, Integer.class);
        Integer areaRentTo = MapUtils.getObject(params, SystemConstant.RENT_AREA_TO, Integer.class);
        Integer rentPriceFrom = MapUtils.getObject(params, SystemConstant.RENT_PRICE_FROM, Integer.class);
        Integer rentPriceTo = MapUtils.getObject(params, SystemConstant.RENT_PRICE_TO, Integer.class);

        // DISTRICT CODE
        if (districtCode != null) {
            joinQuery.append(QueryBuilderUtils.buildingSqlWithJoin("district", "id", "building", "districtid"));
            whereQuery.append(QueryBuilderUtils.buildQueryWithOperator("district.code", districtCode,
                    SystemConstant.EQUAL_OPERATOR));
        }

        // STAFF ID
        if (staffId != null) {
            joinQuery.append(QueryBuilderUtils.buildingSqlWithJoin("assignmentbuilding", "staffid", "building", "id"));
            whereQuery.append(QueryBuilderUtils.buildQueryWithOperator("assignmentbuilding.staffid", staffId,
                    SystemConstant.EQUAL_OPERATOR));
        }

        // RENTAREA FROM - TO
        if (areaRentFrom != null || areaRentTo != null) {
            joinQuery.append(QueryBuilderUtils.buildingSqlWithJoin("rentarea", "buildingid", "building", "id"));
            whereQuery.append(" and EXISTS (SELECT * FROM rentarea WHERE rentarea.buildingid = building.id");
            if (areaRentFrom != null) {
                whereQuery.append(" AND rentarea.value >= " + areaRentFrom);
            }
            if (areaRentTo != null) {
                whereQuery.append(" AND rentarea.value <= " + areaRentTo);
            }
            whereQuery.append(")");
        }

        // RENT PRICE FROM - TO
        if (rentPriceFrom != null) {
            whereQuery.append(" AND building.rentprice >= " + rentPriceFrom + " ");
        }
        if (rentPriceTo != null) {
            whereQuery.append("AND building.rentprice <= " + rentPriceTo + " ");
        }

        // BUILDING TYPES
        // java < 7
        /*
         * if (buildingTypes != null && buildingTypes.size() > 0) {
         * sql.append(" AND ("); List<String> types = new ArrayList<>(); for(String
         * type: buildingTypes){ types.add("renttype.code = '"+type+"'"); } String
         * sqlJoin = String.join(" or ", types); sql.append(sqlJoin); sql.append(")");
         *
         * }
         */

        // java 8
        if (buildingTypes != null && buildingTypes.size() > 0) {
            System.out.println("buildingTypes.size(): " + buildingTypes.size() + buildingTypes);
            joinQuery.append(QueryBuilderUtils.buildingSqlWithJoin("buildingrenttype", "buildingid", "building", "id"));
            joinQuery.append(QueryBuilderUtils.buildingSqlWithJoin("renttype", "id", "buildingrenttype", "renttypeid"));

            whereQuery.append(" AND (");
            String sqlJoin = buildingTypes.stream().map(type -> " renttype.code = '" + type + "' ")
                    .collect(Collectors.joining(" or "));
            whereQuery.append(sqlJoin);
            whereQuery.append(")");
        }

    }
}
